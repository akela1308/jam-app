import { useState } from 'react';
import { TextInput } from '../components/TextInput';
import { Button } from '../components/Button';
import { useLanguage } from '../i18n/LanguageContext';
import './Registration.css';

interface RegistrationProps {
  onComplete: () => void;
}

export function Registration({ onComplete }: RegistrationProps) {
  const { t } = useLanguage();
  const r = t.registration;
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name && password.length >= 8) {
      onComplete();
    }
  };

  return (
    <div className="reg-screen">
      <div className="reg-screen__logo">
        <span className="reg-screen__logo-text">{t.appName}</span>
        <span className="reg-screen__logo-dot" />
      </div>

      <h1 className="reg-screen__title">{r.title}</h1>

      <form className="reg-screen__form" onSubmit={handleSubmit}>
        <TextInput
          label={r.email}
          placeholder={r.emailPlaceholder}
          type="email"
          value={email}
          onChange={setEmail}
        />
        <TextInput
          label={r.name}
          placeholder={r.namePlaceholder}
          value={name}
          onChange={setName}
        />
        <TextInput
          label={r.password}
          placeholder={r.passwordPlaceholder}
          type="password"
          value={password}
          onChange={setPassword}
        />

        <div className="reg-screen__actions">
          <Button type="submit" fullWidth>
            {r.submit}
          </Button>
          <p className="reg-screen__hint">
            {r.alreadyHaveAccount}{' '}
            <button type="button" className="reg-screen__link">{r.login}</button>
          </p>
          <div className="reg-screen__divider">
            <span>{r.or}</span>
          </div>
          <button type="button" className="reg-screen__demo-btn" onClick={onComplete}>
            {r.guestLogin}
          </button>
        </div>
      </form>
    </div>
  );
}
