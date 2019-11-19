[Setup]
AppId={#AppId}
AppName={#Name}
AppVersion={#Version}
AppVerName={#Name} {#Version}
AppPublisher={#Publisher}
AppCopyright={#Copyright}
DefaultDirName={autopf}\{#DirName}
DisableDirPage=yes
DefaultGroupName={#DirName}
AllowNoIcons=yes
PrivilegesRequired={#Privileges}
OutputDir={#OutputDir}
OutputBaseFilename={#SetupName}
SetupIconFile={#SetupIcon}
UninstallDisplayIcon={app}\{#ExeBasename}
ShowLanguageDialog=auto
AlwaysShowDirOnReadyPage=yes
Compression=lzma
SolidCompression=yes
AppMutex={#Name}
ArchitecturesInstallIn64BitMode={#InstallMode}
SetupMutex={#Name}setup

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"
Name: "spanish"; MessagesFile: "compiler:Languages\Spanish.isl"
Name: "russian"; MessagesFile: "compiler:Languages\Russian.isl"
Name: "simplifiedChinese"; MessagesFile: "{#InnoSetupPath}\i18n\Default.zh-cn.isl"

[UninstallDelete]
Type: filesandordirs; Name: "{app}\_"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"

[Files]
Source: "{#SourceDir}\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs

[Icons]
Name: "{group}\{#Name}"; Filename: "{app}\{#ExeBasename}"
Name: "{group}\{cm:UninstallProgram,{#Name}}"; Filename: "{uninstallexe}"
Name: "{autodesktop}\{#Name}"; Filename: "{app}\{#ExeBasename}"; Tasks: desktopicon

[Run]
Filename: "{app}\{#ExeBasename}"; Description: "{cm:LaunchProgram,{#StringChange(Name, '&', '&&')}}"; Flags: nowait postinstall runascurrentuser

