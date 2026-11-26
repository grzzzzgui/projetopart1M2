Guilherme Ribeiro Costa RGM: 11261104566

Vinicius Mello Machado Rgm: 11261104516

Nicolas Victório da Silva Branco RGM: 11261105825

O NRV é um site que atua como uma biblioteca pessoal de álbuns musicais, na qual o usuário pode adicionar, visualizar e excluir álbuns, informando o título, o artista, o ano e uma nota de 0 a 10. 
Já o frontend foi usado o React e Vite, useState, useEffect e fetch para gerenciar os dados e se comunicar com o backend. O backend foi implementado em Python com Django usando SQLite para o armazenamento dos dados. Também fizemos uma API para administrar os álbuns com mecanismos de validação que evitam informações incorretas.

comandos para rodar o front e back

frontend
cd Locadora
cd frontend
npm run dev

backend
cd backend
venv\Scripts\activate
python manage.py runserver