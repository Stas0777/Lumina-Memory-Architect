
import React, { useState } from 'react';

const DistributionPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rpm' | 'github' | 'copr' | 'spec'>('rpm');

  const specFileContent = `Name:           lumina-memory-architect
Version:        1.0.0
Release:        1%{?dist}
Summary:        Advanced Memory Editor and Debugger for Linux

License:        MIT
URL:            https://github.com/user/lumina
Source0:        %{name}-%{version}.tar.gz

BuildRequires:  nodejs, npm, desktop-file-utils
Requires:       electron, nodejs

%description
Lumina is a sophisticated memory editor and debugger interface designed 
for security researchers and reverse engineers on Fedora.

%prep
%autosetup

%build
npm install
npm run build

%install
mkdir -p %{buildroot}%{_bindir}
mkdir -p %{buildroot}%{_datadir}/%{name}
cp -r build/* %{buildroot}%{_datadir}/%{name}/
ln -s %{_datadir}/%{name}/lumina-bin %{buildroot}%{_bindir}/lumina

%files
%{_bindir}/lumina
%{_datadir}/%{name}

%changelog
* Mon Oct 23 2023 Package Maintainer <maintainer@fedora.org> - 1.0.0-1
- Initial Fedora Package release`;

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="p-8 border-b border-slate-800 bg-slate-900/20">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xl shadow-[0_0_15px_rgba(37,99,235,0.4)]">
            <i className="fa-brands fa-fedora"></i>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Fedora Packaging Hub</h1>
            <p className="text-slate-400 text-sm">Generate and install native RPM packages for Fedora Linux.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Navigation */}
        <div className="w-64 border-r border-slate-800 p-4 flex flex-col gap-2 bg-[#0d0d11]">
          <button 
            onClick={() => setActiveTab('rpm')}
            className={`text-left px-4 py-3 rounded-lg text-sm transition-all ${activeTab === 'rpm' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <i className="fa-solid fa-box mr-3"></i> 1. Build RPM Package
          </button>
          <button 
            onClick={() => setActiveTab('github')}
            className={`text-left px-4 py-3 rounded-lg text-sm transition-all ${activeTab === 'github' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <i className="fa-brands fa-github mr-3"></i> 2. GitHub Release
          </button>
          <button 
            onClick={() => setActiveTab('copr')}
            className={`text-left px-4 py-3 rounded-lg text-sm transition-all ${activeTab === 'copr' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <i className="fa-solid fa-cloud-arrow-up mr-3"></i> 3. Fedora COPR
          </button>
          <button 
            onClick={() => setActiveTab('spec')}
            className={`text-left px-4 py-3 rounded-lg text-sm transition-all ${activeTab === 'spec' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400 hover:bg-slate-800'}`}
          >
            <i className="fa-solid fa-file-code mr-3"></i> 4. Manual Spec
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {activeTab === 'rpm' && (
            <div className="max-w-3xl space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">Native RPM Packaging</h2>
              <p className="text-slate-400 leading-relaxed">Packaging as an RPM allows your app to integrate perfectly with Fedora's <span className="text-blue-400 font-mono">dnf</span> package manager and appear in the GNOME/KDE application menus.</p>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-[#121216] border border-slate-800 rounded-xl p-6">
                  <h3 className="text-sm font-bold text-blue-400 mb-4 flex items-center gap-2">
                    <i className="fa-solid fa-terminal"></i>
                    Step 1: Build the RPM
                  </h3>
                  <div className="bg-black rounded p-3 mono text-xs text-emerald-500 border border-slate-800 group relative">
                    <button 
                      onClick={() => navigator.clipboard.writeText('npm run dist')}
                      className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 px-2 py-1 rounded text-[10px]"
                    >Copy</button>
                    npm run dist
                  </div>
                  <p className="text-[11px] text-slate-500 mt-2">This command uses electron-builder to generate a .rpm file in the /dist folder.</p>
                </div>

                <div className="bg-[#121216] border border-slate-800 rounded-xl p-6">
                  <h3 className="text-sm font-bold text-blue-400 mb-4 flex items-center gap-2">
                    <i className="fa-solid fa-download"></i>
                    Step 2: Install Locally
                  </h3>
                  <div className="bg-black rounded p-3 mono text-xs text-emerald-500 border border-slate-800 group relative">
                    <button 
                      onClick={() => navigator.clipboard.writeText('sudo dnf install ./dist/lumina-memory-architect-1.0.0.x86_64.rpm')}
                      className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 px-2 py-1 rounded text-[10px]"
                    >Copy</button>
                    sudo dnf install ./dist/*.rpm
                  </div>
                </div>
              </div>

              <div className="bg-blue-600/10 border border-blue-500/30 p-4 rounded-lg flex items-start gap-4">
                <i className="fa-solid fa-circle-check text-blue-500 mt-1"></i>
                <div>
                  <h4 className="text-sm font-bold text-slate-200">Ready for Fedora Repos</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">The RPM generated includes desktop entries, icons, and MIME associations required for official Fedora repository acceptance.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'github' && (
            <div className="max-w-3xl space-y-6">
              <h2 className="text-xl font-bold text-white mb-4">GitHub Distribution</h2>
              <p className="text-slate-400">Automate your releases using GitHub Actions and Electron's auto-updater.</p>
              
              <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Configure environment</h4>
                  <div className="bg-black rounded p-3 mono text-xs text-emerald-500 border border-slate-800">
                    export GH_TOKEN=your_github_personal_access_token
                  </div>
                </div>
                <p className="text-sm text-slate-400">Once set, <code className="text-emerald-400">npm run dist</code> will automatically upload your built RPM to your GitHub repository's "Releases" section.</p>
              </div>
            </div>
          )}

          {activeTab === 'spec' && (
            <div className="max-w-3xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">Manual Spec File</h2>
                <button 
                  onClick={() => navigator.clipboard.writeText(specFileContent)}
                  className="bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded text-xs font-bold transition-all"
                >
                  <i className="fa-solid fa-copy mr-2"></i> Copy Spec
                </button>
              </div>
              <pre className="bg-black/50 border border-slate-800 rounded-lg p-6 mono text-xs text-slate-300 leading-relaxed overflow-x-auto custom-scrollbar">
                {specFileContent}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DistributionPortal;
