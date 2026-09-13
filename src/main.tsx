import React from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/nunito-sans/400.css';
import '@fontsource/nunito-sans/700.css';
import '@fontsource/nunito-sans/800.css';
import './styles/recovered.css';
import './styles/design-system.css';
import { App } from './screens/App.js';

class AppBoundary extends React.Component<React.PropsWithChildren, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: Error) { console.error('Falha na interface:', error); }
  render() {
    if (this.state.failed) return <main className="recovery-error"><h1>Vamos tentar novamente</h1><p>Não foi possível abrir esta tela. Seus dados continuam armazenados neste aparelho.</p><button className="ui-button" onClick={() => location.reload()}>Reabrir aplicativo</button></main>;
    return this.props.children;
  }
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><AppBoundary><App /></AppBoundary></React.StrictMode>);
