import LoginForm from '@/components/LoginForm/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex flex-col justify-center p-14">
      <p>
        Autorem niniejszego serwisu jest Olha Sereda. Serwis ten stanowi integralną część pracy licencjackiej (kierunek:
        elektroniczne przetwarzanie informacji), przygotowanej pod kierunkiem &quot;APLIKACJA WSPOMAGAJĄCA ZARZĄDZANIE
        USŁUGAMI DOSTĘPNYMI NA SERWERZE &quot;, Janusz Jurek na Wydziale Zarządzania i Komunikacji Społecznej
        Uniwersytetu Jagiellońskiego.
      </p>
      <br />
      <h1 className="text-lg">Zaloguj się do aplikacji:</h1>
      <LoginForm />
    </div>
  );
}
