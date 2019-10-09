import '../lib/logging/renderer-process/install';
import './ipc-renderer';

let g: any = window;

g.nodeProcess = process;
