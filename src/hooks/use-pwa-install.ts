import { useEffect, useState } from 'react';

type InstallOutcome = 'accepted' | 'dismissed';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: InstallOutcome; platform: string }>;
};

type InstallResult = InstallOutcome | 'installed' | 'unavailable';

const isRunningAsInstalledApp = () => {
  const navigatorWithStandalone = window.navigator as Navigator & { standalone?: boolean };

  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    navigatorWithStandalone.standalone === true
  );
};

export function usePwaInstall() {
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    setIsInstalled(isRunningAsInstalledApp());

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setPromptEvent(event as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setPromptEvent(null);
      setIsInstalled(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const installApp = async (): Promise<InstallResult> => {
    if (isInstalled) {
      return 'installed';
    }

    if (!promptEvent) {
      return 'unavailable';
    }

    await promptEvent.prompt();
    const choice = await promptEvent.userChoice.catch(() => null);
    setPromptEvent(null);

    return choice?.outcome ?? 'dismissed';
  };

  return {
    canInstall: Boolean(promptEvent),
    installApp,
    isInstalled,
  };
}
