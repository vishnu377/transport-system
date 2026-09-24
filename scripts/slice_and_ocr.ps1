Add-Type -AssemblyName System.Drawing

$inputDir = "C:\Users\HP\Downloads\BIILITEY VISISBILE"
$slicedDir = "scripts\sliced_images"

if (-not (Test-Path $slicedDir)) {
    New-Item -ItemType Directory -Path $slicedDir | Out-Null
}

$files = Get-ChildItem -Path $inputDir -Filter *.png

foreach ($f in $files) {
    $img = [System.Drawing.Image]::FromFile($f.FullName)
    $w = $img.Width
    $h = $img.Height
    Write-Output "File: $($f.Name), Width: $w, Height: $h"
    
    if ($h -gt 2500) {
        # Slice into chunks of 2000px height
        $sliceHeight = 2000
        $slices = [Math]::Ceiling($h / $sliceHeight)
        for ($i = 0; $i -lt $slices; $i++) {
            $y = $i * $sliceHeight
            $currentH = [Math]::Min($sliceHeight, $h - $y)
            $rect = [System.Drawing.Rectangle]::new(0, $y, $w, $currentH)
            $bmp = New-Object System.Drawing.Bitmap($w, $currentH)
            $g = [System.Drawing.Graphics]::FromImage($bmp)
            $srcRect = [System.Drawing.Rectangle]::new(0, $y, $w, $currentH)
            $destRect = [System.Drawing.Rectangle]::new(0, 0, $w, $currentH)
            $g.DrawImage($img, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
            $g.Dispose()
            
            $outPath = Join-Path $slicedDir "$($f.BaseName)_part$i.png"
            $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
            $bmp.Dispose()
            Write-Output "  Created slice: $outPath"
        }
    } else {
        $outPath = Join-Path $slicedDir $f.Name
        Copy-Item $f.FullName -Destination $outPath
    }
    $img.Dispose()
}

Write-Output "Slicing complete!"
