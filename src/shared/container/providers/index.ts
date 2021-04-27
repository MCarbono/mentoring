import { container } from 'tsyringe'

import { StorageProvider } from './storageProvider/implementations/StorageProvider'
import { IStorageProvider } from './storageProvider/IStorageProvider'

container.registerSingleton<IStorageProvider>(
    "LocalStorageProvider",
    StorageProvider
)