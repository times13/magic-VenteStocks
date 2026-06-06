# =====================================================================
# Reinitialise le mot de passe du role 'postgres' (PostgreSQL 16).
# A LANCER DANS UN POWERSHELL ADMINISTRATEUR.
#
# Methode : on bascule temporairement l'authentification locale en
# 'trust' (connexion sans mot de passe), on fixe le nouveau mot de
# passe, puis on restaure la config d'origine. Le nouveau mot de passe
# est 'postgres' (= valeur par defaut attendue par le backend).
# =====================================================================
$ErrorActionPreference = 'Stop'

$pgRoot = 'C:\Program Files\PostgreSQL\16'
$service = 'postgresql-x64-16'
$hba = Join-Path $pgRoot 'data\pg_hba.conf'
$psql = Join-Path $pgRoot 'bin\psql.exe'
$newPassword = 'postgres'

if (-not (Test-Path $hba)) { throw "pg_hba.conf introuvable : $hba" }

Write-Host "1/6  Sauvegarde de pg_hba.conf..." -ForegroundColor Cyan
Copy-Item $hba "$hba.bak" -Force

Write-Host "2/6  Passage de l'authentification locale en 'trust'..." -ForegroundColor Cyan
(Get-Content $hba) -replace '\b(scram-sha-256|md5|password)\b', 'trust' |
    Set-Content $hba -Encoding ascii

Write-Host "3/6  (Re)demarrage du service $service..." -ForegroundColor Cyan
Restart-Service $service -Force
Start-Sleep -Seconds 3

Write-Host "4/6  Definition du nouveau mot de passe..." -ForegroundColor Cyan
& $psql -U postgres -h 127.0.0.1 -d postgres -c "ALTER USER postgres PASSWORD '$newPassword';"

Write-Host "5/6  Restauration de la configuration securisee..." -ForegroundColor Cyan
Copy-Item "$hba.bak" $hba -Force
Remove-Item "$hba.bak" -Force

Write-Host "6/6  Redemarrage du service pour appliquer..." -ForegroundColor Cyan
Restart-Service $service -Force
Start-Sleep -Seconds 2

Write-Host ""
Write-Host "OK - Mot de passe du role 'postgres' reinitialise a : $newPassword" -ForegroundColor Green
Write-Host "Le service est demarre et ecoute sur le port 5432." -ForegroundColor Green
