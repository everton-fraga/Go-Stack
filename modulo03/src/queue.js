// não vamos executr a fila na mesma execução do node da aplicação. Pois assim ~
// a fila não afeta a performance da applicação

import 'dotenv/config'; // carrega as variavel do arquivo ".env" e coloca na variavel global do node chamado process.env

import Queue from './lib/Queue';

Queue.processQueue();
