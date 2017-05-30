import Tablr from './Tablr';

function humanFileSize(bytes, si) {
  const thresh = si ? 1000 : 1024;
  if (Math.abs(bytes) < thresh) return `${bytes} B`;
  const units = si
      ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  do {
    bytes /= thresh;
    u += 1;
  } while(Math.abs(bytes) >= thresh && u < units.length - 1);
  return bytes.toFixed(1)+' '+units[u];
}

const dataArr = [
  ['Patricia Fantastic', '1993-03-11', '124839285'],
  ['Mike Powers', '1989-11-26', '84821'],
  ['Dana Simco', '1963-06-02', '8597335'],
];

const dataObj = [
  {
    name: 'Patricia Fantastic',
    birthday: new Date('1993-03-11'),
    diskQuota: 124839285,
  },
  {
    name: 'Mike Powers',
    birthday: new Date('1989-11-26'),
    diskQuota: 84821,
  },
  {
    name: 'Dana Simco',
    birthday: new Date('1963-06-02'),
    diskQuota: 8597335,
  },
];

const tablr = new Tablr('.table', {
  data: dataObj,
  columns: [
    {
      id: 'name',
      label: 'Name',
    },
    {
      id: 'birthday',
      label: 'Birthday',
      displayValue: date => date.toLocaleDateString(),
    },
    {
      id: 'diskQuota',
      label: 'Disk Quota',
      displayValue: bytes => humanFileSize(bytes, true),
    },
  ],
  paginate: {
    size: [1, 2],
    selectedSize: 2,
  },
});

window.tablr = tablr;

export default Tablr;
