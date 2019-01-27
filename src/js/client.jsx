/* eslint-env browser */

import React from 'react';
import ReactDOM from 'react-dom';

import Layout from './components/Layout';

import '../_sass/styles.scss';

const app = document.getElementById('app');
ReactDOM.render(<Layout />, app);
