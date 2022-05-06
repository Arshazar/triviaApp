import localforage from 'localforage'

class Storage {
  save({ key, data }, cb = () => false) {
    return new Promise((resolve, reject) => {
      localforage
        .setItem(
          key,
          JSON.stringify({
            data
          }),
          cb
        )
        .then((res) => {
          if (res) resolve('OK')
          else reject()
        })
        .catch(reject)
    })
  }

  remove({ key }) {
    localforage.removeItem(key, () => false)
  }

  load({ key }) {
    return new Promise((resolve, reject) => {
      localforage
        .getItem(key)
        .then((value) => {
          if (value) resolve(JSON.parse(value).data)
          else reject()
        })
        .catch(reject)
    })
  }
}

const storage = new Storage()
export { storage }
