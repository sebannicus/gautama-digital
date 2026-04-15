@echo off
schtasks /create /tn "Gautama-Social" /tr "python C:\Users\crman\Downloads\Claude\gautama-digital\scripts\social\publish.py" /sc daily /st 20:00 /f
if %ERRORLEVEL% == 0 (
    echo.
    echo Tarea instalada. Publicara automaticamente a las 20:00.
    echo.
    echo Para verificar: schtasks /query /tn "Gautama-Social"
    echo Para test real: python C:\Users\crman\Downloads\Claude\gautama-digital\scripts\social\publish.py
    echo Para dry-run  : python C:\Users\crman\Downloads\Claude\gautama-digital\scripts\social\publish.py --dry-run
) else (
    echo ERROR: ejecuta este archivo como Administrador.
)
pause
