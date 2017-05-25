const Tablr = require('./Tablr');

const dataArr = [
  ['Patricia Fantastic', '1993-03-11', '124839285'],
  ['Mike Powers', '1989-11-26', '84821'],
  ['Dana Simco', '1963-06-02', '8597335'],
];

const dataObj = [
  {
    name: 'Patricia Fantastic',
    birthday: '1993-03-11',
    diskQuota: '124839285',
  },
  {
    name: 'Mike Powers',
    birthday: '1989-11-26',
    diskQuota: '84821',
  },
  {
    name: 'Dana Simco',
    birthday: '1963-06-02',
    diskQuota: '8597335',
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
    },
    {
      id: 'diskQuota',
      label: 'Disk Quota',
    },
  ],
});

window.tablr = tablr;

module.exports = Tablr;
