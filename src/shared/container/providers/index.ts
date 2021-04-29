import { container } from 'tsyringe'

import { StorageProvider } from './storageProvider/implementations/StorageProvider'
import { IStorageProvider } from './storageProvider/IStorageProvider'

import { IDateProvider } from './dateProvider/IDateProvider'
import { DayjsDateProvider } from './dateProvider/implementations/DayjsDateProvider'

container.registerSingleton<IStorageProvider>(
    "LocalStorageProvider",
    StorageProvider
)

container.registerSingleton<IDateProvider>(
    "DayjsDateProvider",
    DayjsDateProvider
)