export * from '../lib/delay';
export * from '../lib/getTime';
export * from '../lib/formatTimeString';
export * from '../lib/spinner';
export * from '../lib/task-timer';
export * from '../lib/checkNodeVersion';

import Chalk from 'chalk';
export const chalk: typeof Chalk;

import Clear from 'clear';
export const clear: typeof Clear;

import Clui from 'clui';
export const clui: typeof Clui;

import Figlet from 'figlet';
export const figlet: typeof Figlet;

import Inquirer from 'inquirer';
export const inquirer: typeof Inquirer;

import Commander from 'commander';
export const commander: typeof Commander;

import FsExtra from 'fs-extra';
export const fs: typeof FsExtra;

import CrossSpawn from 'cross-spawn';
export const crossSpawn: typeof CrossSpawn;
