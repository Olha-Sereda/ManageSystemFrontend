import LoginForm from '@/components/LoginForm/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex flex-col justify-center p-24">
      <p>
        Autorem niniejszego serwisu jest Olha Sereda. Serwis ten stanowi integralną część pracy licencjackiej (kierunek:
        elektroniczne przetwarzanie informacji), przygotowanej pod kierunkiem &quot;APLIKACJA WSPOMAGAJĄCA ZARZĄDZANIE
        USŁUGAMI DOSTĘPNYMI NA SERWERZE &quot;, Janusz Jurek na Wydziale Zarządzania i Komunikacji Społecznej
        Uniwersytetu Jagiellońskiego.
      </p>
      <br />
      <div className="text-sm flex flex-col">
        <span>Przykładowe dane do logowania:</span>
        <span>Uzytkownik: email: user0@example.com hasło: user1234</span>
        <span>Administartor: email: admin0@example.com hasło: admin1234</span>
      </div>
      <br />
      <h1 className="text-lg">Zaloguj się do aplikacji:</h1>
      <LoginForm />
    </div>
  );
}
