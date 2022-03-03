const Handlebars = require('handlebars');

module.exports = {
    sum : (a, b) => a + b,
    sortable : (field, sort) => {
      const sortType = field === sort.column ? sort.type : 'default';

      const icons = {
        default: 'oi oi-elevator',
        desc: 'oi oi-sort-descending',
        asc: 'oi oi-sort-ascending'
      }

      const types = {
        default: 'desc',
        desc : 'asc',
        asc: 'desc'
      }
      
      const icon = icons[sortType];
      const type = types[sortType];
      const address = Handlebars.escapeExpression(`?_sort&column=${field}&type=${type}`)

      const output =  `<a href="${address}">
            <span class="${icon}"></span>
        </a>`
      return new Handlebars.SafeString(output);
    }
  };