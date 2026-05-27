import { useEffect, useState } from 'react';

type InstallOutcome = 'accepted' | 'dismissed';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: InstallOutcome; platform: string }>;
};

type InstallResult = InstallOutcome | 'installed' | 'unavailable';

let deferredPrompt: BeforeInstallPromptEvent | null = null;
let installed = false;
const subscribers = new Set<() => void>();

const notifySubscribers = () => {
  subscribers.forEach((subscriber) => subscriber());
};

const isRunningAsInstalledApp = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  const navigatorWithStandalone = window.navigator as Navigator & { standalone?: boolean };

  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    navigatorWithStandalone.standalone === true
  );
};

if (typeof window !== 'undefined') {
  const windowWithPwaListener = window as Window & { __urtcPwaInstallListenerReady?: boolean };

  if (!windowWithPwaListener.__urtcPwaInstallListenerReady) {
    windowWithPwaListener.__urtcPwaInstallListenerReady = true;
    installed = isRunningAsInstalledApp();

    window.addEventListener('beforeinstallprompt', (event: Event) => {
      event.preventDefault();
      deferredPrompt = event as BeforeInstallPromptEvent;
      notifySubscribers();
    });

    window.addEventListener('appinstalled', () => {
      deferredPrompt = null;
      installed = true;
      notifySubscribers();
    });
  }
}

export function usePwaInstall() {
  const [, setVersion] = useState(0);

  useEffect(() => {
    installed = isRunningAsInstalledApp();
    const handleChange = () => setVersion((current) => current + 1);
    subscribers.add(handleChange);
    handleChange();

    return () => {
      subscribers.delete(handleChange);
    };
  }, []);

  const installApp = async (): Promise<InstallResult> => {
    if (installed || isRunningAsInstalledApp()) {
      return 'installed';
    }

    if (!deferredPrompt) {
      return 'unavailable';
    }

    const promptEvent = deferredPrompt;
    await promptEvent.prompt();
    const choice = await promptEvent.userChoice.catch(() => null);
    deferredPrompt = null;
    notifySubscribers();

    return choice?.outcome ?? 'dismissed';
  };

  return {
    canInstall: Boolean(deferredPrompt),
    installApp,
    isInstalled: installed,
  };
}
