$ErrorActionPreference='Continue'
$base='D:\Downloads\codex-images\gold\v3'
$gen='C:\Users\guegs\aiox-project\.claude\skills\codex-imagegen\scripts\codex-imagegen.ps1'
$refNavy='D:\Downloads\codex-images\gold\3d-corretor\codex-20261029-151600-01.png'
$refIvory='D:\Downloads\codex-images\gold\skill-pura\o01\codex-20261030-104639-01.png'
$p = Get-Content -Raw -Encoding UTF8 "$base\prompts.json" | ConvertFrom-Json
$ids = $p.PSObject.Properties.Name | Sort-Object
if ($args.Count -gt 0) { $ids = $args }
foreach ($id in $ids) {
  $o = "$base\o$id"; New-Item -ItemType Directory -Force $o | Out-Null
  if (Get-ChildItem "$o\*.png" -ErrorAction SilentlyContinue) { continue }
  $e = $p.$id
  [IO.File]::WriteAllText("$base\prompt-$id.md", $e.prompt, (New-Object Text.UTF8Encoding $false))
  $ref = if ($e.cor -eq 'navy') { $refNavy } else { $refIvory }
  & $gen -PromptFile "$base\prompt-$id.md" -Ref $ref -Aspect '2:3' -OutDir $o *> "$o\log.txt"
}
"FIM" | Out-File "$base\fim.txt"
