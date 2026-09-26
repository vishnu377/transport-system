param(
    [string]$HeaderDir = "C:\Users\HP\.gemini\antigravity\scratch\owners_and_cheques\headers",
    [string]$OutJsonPath = "C:\Users\HP\.gemini\antigravity\scratch\owners_and_cheques\header_classifications.json"
)

Add-Type -AssemblyName System.Runtime.WindowsRuntime
$asTaskGeneric = ([System.WindowsRuntimeSystemExtensions].GetMethods() | ? { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.ContainsGenericParameters })[0]
Function Await($WinRtTask, $ResultType) {
    $asTask = $asTaskGeneric.MakeGenericMethod($ResultType)
    $netTask = $asTask.Invoke($null, @($WinRtTask))
    $netTask.Wait(-1) | Out-Null
    $netTask.Result
}

[Windows.Media.Ocr.OcrEngine, Windows.Foundation, ContentType = WindowsRuntime] | Out-Null
[Windows.Graphics.Imaging.BitmapDecoder, Windows.Graphics, ContentType = WindowsRuntime] | Out-Null
[Windows.Storage.StorageFile, Windows.Storage, ContentType = WindowsRuntime] | Out-Null

$engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromUserProfileLanguages()
if ($null -eq $engine) {
    $engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage([Windows.Globalization.Language]::new("en-US"))
}

$files = Get-ChildItem "$HeaderDir\header_*.png" | Sort-Object Name
Write-Output "Processing $($files.Count) header images in-memory..."

$results = [ordered]@{}

foreach ($f in $files) {
    try {
        $file = Await ([Windows.Storage.StorageFile]::GetFileFromPathAsync($f.FullName)) ([Windows.Storage.StorageFile])
        $stream = Await ($file.OpenAsync([Windows.Storage.FileAccessMode]::Read)) ([Windows.Storage.Streams.IRandomAccessStream])
        $decoder = Await ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)) ([Windows.Graphics.Imaging.BitmapDecoder])
        $softwareBitmap = Await ($decoder.GetSoftwareBitmapAsync()) ([Windows.Graphics.Imaging.SoftwareBitmap])
        $ocrResult = Await ($engine.RecognizeAsync($softwareBitmap)) ([Windows.Media.Ocr.OcrResult])

        $lines = @()
        foreach ($l in $ocrResult.Lines) {
            $lines += $l.Text
        }
        $fullText = ($lines -join " ").ToLower()

        $category = "Unknown"
        if ($fullText -match "cheque" -or $fullText -match "chq") {
            $category = "Cheques"
        } elseif ($fullText -match "owner" -or $fullText -match "truck") {
            $category = "Truck Owners"
        } elseif ($fullText -match "trip" -or $fullText -match "bilty") {
            $category = "Trips"
        }

        $results[$f.Name] = @{
            category = $category
            lineCount = $lines.Count
            lines = $lines
        }

        Write-Output "$($f.Name): [$category] ($($lines.Count) lines) -> $(($lines | Select-Object -First 3) -join ' | ')"
    } catch {
        Write-Output "$($f.Name): Error - $_"
    }
}

$json = $results | ConvertTo-Json -Depth 5
[System.IO.File]::WriteAllText($OutJsonPath, $json, [System.Text.Encoding]::UTF8)
Write-Output "Classifications saved to $OutJsonPath"
