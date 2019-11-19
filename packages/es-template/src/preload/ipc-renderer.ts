import { ipcRenderer } from 'electron';

let g: any = window;

g.ipcRenderer = ipcRenderer;
