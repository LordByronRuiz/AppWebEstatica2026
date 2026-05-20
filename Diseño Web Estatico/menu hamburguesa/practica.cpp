#include <iostream>
#include <string>

using namespace std;

class CuentaBancaria {
private:
    string titular;
    double saldo;

public:
    CuentaBancaria(string nombre, double saldoInicial) {
        titular = nombre;
        if (saldoInicial >= 0) {
            saldo = saldoInicial;
        } else {
            saldo = 0;
            cout << "El saldo inicial no puede ser negativo. Se establecio en 0." << endl;
        }
    }

    void mostrarDatos() {
        cout << "Titular: " << titular << endl;
        cout << "Saldo actual: $" << saldo << endl;
    }

    void depositar() {
        double monto;
        cout << "Ingrese monto a depositar: ";
        cin >> monto;
        
        if (monto > 0) {
            saldo += monto;
            cout << "Saldo actualizado: $" << saldo << endl;
        } else {
            cout << "El monto a depositar debe ser positivo." << endl;
        }
    }

    void retirar() {
        double monto;
        cout << "Ingrese monto a retirar: ";
        cin >> monto;
        
        if (monto > 0 && monto <= saldo) {
            saldo -= monto;
            cout << "Retiro realizado con exito." << endl;
            cout << "Saldo final: $" << saldo << endl;
        } else if (monto <= 0) {
            cout << "El monto a retirar debe ser positivo." << endl;
        } else {
            cout << "Saldo insuficiente. No es posible realizar el retiro." << endl;
            cout << "Saldo disponible: $" << saldo << endl;
        }
    }

    void verificarEstado() {
        if (saldo > 0) {
            cout << "La cuenta esta en saldo positivo." << endl;
        } else if (saldo == 0) {
            cout << "La cuenta esta en saldo cero." << endl;
        } else {
            cout << "La cuenta esta en saldo negativo." << endl;
        }
    }
};

int main() {
    string nombre;
    double saldoInicial;
    
    cout << "Ingrese el nombre del titular: ";
    getline(cin, nombre);
    
    cout << "Ingrese el saldo inicial: ";
    cin >> saldoInicial;
    
    CuentaBancaria cuenta(nombre, saldoInicial);
    
    cout << "\n";
    cuenta.mostrarDatos();
    
    cout << "\n";
    cuenta.depositar();
    
    cout << "\n";
    cuenta.retirar();
    
    cout << "\n";
    cuenta.verificarEstado();
    
    return 0;
}