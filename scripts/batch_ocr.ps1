param(
    [string]$InputDir = "C:\Users\HP\Downloads\ledger aal pic",
    [string]$OutputDir = "scripts\ocr_results"
)

if (-not (Test-Path $OutputDir)) {
    New-Item -ItemType Directory -Path $OutputDir | Out-Null
}

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

$files = Get-ChildItem -Path $InputDir -Include *.jpeg,*.jpg,*.png -Recurse
$total = $files.Count
$idx = 0

foreach ($f in $files) {
    $idx++
    $safeName = $f.BaseName -replace '[^a-zA-Z0-9_\-\(\)]', '_'
    $outFile = Join-Path $OutputDir "$safeName.json"
    
    if (Test-Path $outFile) {
        Write-Output "[$idx/$total] Skipping already processed: $($f.Name)"
        continue
    }
    
    Write-Output "[$idx/$total] Processing: $($f.Name)"
    try {
        $file = Await ([Windows.Storage.StorageFile]::GetFileFromPathAsync($f.FullName)) ([Windows.Storage.StorageFile])
        $stream = Await ($file.OpenAsync([Windows.Storage.FileAccessMode]::Read)) ([Windows.Storage.Streams.IRandomAccessStream])
        $decoder = Await ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)) ([Windows.Graphics.Imaging.BitmapDecoder])
        $softwareBitmap = Await ($decoder.GetSoftwareBitmapAsync()) ([Windows.Graphics.Imaging.SoftwareBitmap])
        $ocrResult = Await ($engine.RecognizeAsync($softwareBitmap)) ([Windows.Media.Ocr.OcrResult])
        
        $words = @()
        foreach ($line in $ocrResult.Lines) {
            foreach ($w in $line.Words) {
                $words += @{
                    text = $w.Text
                    x = [int]$w.BoundingRect.X
                    y = [int]$w.BoundingRect.Y
                    w = [int]$w.BoundingRect.Width
                    h = [int]$w.BoundingRect.Height
                }
            }
        }
        
        $res = @{
            image = $f.FullName
            fileName = $f.Name
            lineCount = $ocrResult.Lines.Count
            lines = ($ocrResult.Lines | ForEach-Object { $_.Text })
            words = $words
        }
        
        $json = $res | ConvertTo-Json -Depth 5
        [System.IO.File]::WriteAllText($outFile, $json, [System.Text.Encoding]::UTF8)
    } catch {
        Write-Warning "Failed on $($f.Name): $_"
    }
}
Write-Output "All done!"
