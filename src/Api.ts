import tape from 'tape'

import ShotApi from './ShotApi'
import Config from './Config'
import Session from './Session'
import Repository from './Repository'
import Image from './Image'

type ShotCallback = (api: ShotApi) => Promise<Image>

export function shot(subjectName: string, callback: ShotCallback): void {
  tape(subjectName, async function (t) {
    const config = Config.getCurrent()
    const repository = new Repository(config, subjectName)
    const shot = await callback(new ShotApi(config, new Session()))
    const name = new Date().getTime().toString()
    repository.saveImage(name, shot)
    const reference = await repository.loadImage('reference')
    if (reference) {
      const difference = await reference.compareTo(shot)
      if (difference) {
        await repository.saveImage(name + '-difference', difference)
        t.fail('shot does not match reference')
      } else {
        t.pass('shot is equal to reference')
      }
    } else {
      t.pass('no reference yet')
    }
  })
}
