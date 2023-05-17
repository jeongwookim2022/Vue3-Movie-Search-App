exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      name: 'KIM',
      age: 26,
      email: 'jeongwookim124068@gmail.com'
    })
  }
}