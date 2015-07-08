export default function warn(type, message, data) {
    console.warn(`%c ${type} %c ${message}`, 'background:#B73F3F;color:#fff;', 'background: none; color: #000;', data);
}