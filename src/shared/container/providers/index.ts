import { container } from 'tsyringe'

import { StorageProvider } from './storageProvider/implementations/StorageProvider'
import { IStorageProvider } from './storageProvider/IStorageProvider'

import { IDateProvider } from './dateProvider/IDateProvider'
import { DayjsDateProvider } from './dateProvider/implementations/DayjsDateProvider'

/*import { IMailProvider } from './mailProvider/IMailProvider'
import { EtherealMailProvider } from './mailProvider/implementations/EtherealMailProvider'*/

container.registerSingleton<IStorageProvider>(
    "LocalStorageProvider",
    StorageProvider
)

container.registerSingleton<IDateProvider>(
    "DayjsDateProvider",
    DayjsDateProvider
)

/*container.registerInstance<IMailProvider>(
    "EtherealMailProvider",
    new EtherealMailProvider()
)*/