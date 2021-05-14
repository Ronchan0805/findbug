const mysql = require('mysql')
const pool = mysql.createPool({
  host     :  '172.81.252.202',
  port     :  '3306',
  user     :  'root',
  password :  'zr1998zr',
  database :  'findbug'
})

/**
 * 接收一个sql语句及对应的values数组
 * eg: query(`select * from my_database where id = ?`, [1])
 * @param {String} sql 
 * @param {Array} values 
 * @returns { Promise }
 */
let query = function( sql, values ) {
  // 返回一个 Promise
  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject( err )
      } else {
        connection.query(sql, values, ( err, rows) => {

          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          // 结束会话
          connection.release()
        })
      }
    })
  })
}

module.exports =  query