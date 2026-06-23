import { useState } from 'react';
import { TextInput } from '../components/TextInput';
import { Button } from '../components/Button';
import './Registration.css';

interface RegistrationProps {
  onComplete: () => void;
}

export function Registration({ onComplete }: RegistrationProps) {
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
      {/* Logo */}
      <div className="reg-screen__logo">
        <span className="reg-screen__logo-text">ДЖЕМ</span>
        <span className="reg-screen__logo-dot" />
      </div>

      <h1 className="reg-screen__title">Регистрация</h1>

      <form className="reg-screen__form" onSubmit={handleSubmit}>
        <TextInput
          label="Электронная почта"
          placeholder="example@site.com"
          type="email"
          value={email}
          onChange={setEmail}
        />
        <TextInput
          label="Как тебя зовут?"
          placeholder="Имя"
          value={name}
          onChange={setName}
        />
        <TextInput
          label="Придумай пароль"
          placeholder="Минимум 8 символов"
          type="password"
          value={password}
          onChange={setPassword}
        />

        <div className="reg-screen__actions">
          <Button type="submit" fullWidth>
            Создать профиль
          </Button>
          <p className="reg-screen__hint">
            Уже есть аккаунт?{' '}
            <button type="button" className="reg-screen__link">Войти</button>
          </p>
          <div className="reg-screen__divider">
            <span>или</span>
          </div>
          <button type="button" className="reg-screen__demo-btn" onClick={onComplete}>
            Войти как гость
          </button>
        </div>
      </form>
    </div>
  );
}
