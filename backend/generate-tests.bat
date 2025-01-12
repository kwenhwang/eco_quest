@echo off
:: 모델 이름 입력받기
set /p modelNames=Enter comma-separated model names (e.g., User,Game,Trade): 

:: 기본 테스트 폴더 구성
set TEST_DIR=tests
set CONTROLLER_DIR=%TEST_DIR%\controllers
set MODEL_DIR=%TEST_DIR%\models
set INTEGRATION_DIR=%TEST_DIR%\integration

:: 테스트 폴더가 없으면 생성
if not exist %TEST_DIR% mkdir %TEST_DIR%
if not exist %CONTROLLER_DIR% mkdir %CONTROLLER_DIR%
if not exist %MODEL_DIR% mkdir %MODEL_DIR%
if not exist %INTEGRATION_DIR% mkdir %INTEGRATION_DIR%

:: 모델 이름을 반복적으로 처리
for %%m in (%modelNames%) do (
    :: 각 폴더에 해당 테스트 파일 생성
    echo // Controller tests for %%m > %CONTROLLER_DIR%\%%mController.test.js
    echo // Model tests for %%m > %MODEL_DIR%\%%m.test.js
    echo // Integration tests for %%m > %INTEGRATION_DIR%\%%mIntegration.test.js
)

echo Folders and test files successfully created!
pause
