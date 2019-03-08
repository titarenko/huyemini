import tape from 'tape'

import ShotApi from './ShotApi'
import Config from './Config'
import Session from './Session'
import Repository from './Repository'
import Image from './Image'

type ShotCallback = (api: ShotApi) => Promise<Image>

const config: Config = {
  basePath: '1',
  baseUrl: '2',
}

export function shot(name: string, callback: ShotCallback): void {
  tape(name, async function (t) {
    const repository = new Repository(config, name)
    const shot = await callback(new ShotApi(config, new Session()))
    const instanceName = new Date().getTime().toString()
    repository.saveImage(instanceName, shot)
    const reference = await repository.loadImage('reference')
    if (reference) {
      const difference = await reference.compareTo(shot)
      if (difference) {
        await repository.saveImage(instanceName + '-difference', difference)
        t.fail('shot does not match reference')
      } else {
        t.pass('shot is equal to reference')
      }
    } else {
      t.pass('no reference yet')
    }
  })
}
