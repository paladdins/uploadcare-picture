import {buildOptions} from './build-options'
import {buildSrc} from './build-src'
import {buildSrcSet} from './build-srcset'
import {buildName} from './build-name'
import {cleanKeys} from './clean-keys'

export function buildWidth(width) {
  if (!!width) {
    return width
  }
}

export function getImage(uuid, opts) {
  const options = buildOptions(opts)

  const sizes = options.sizes && options.sizes.default
    ? options.sizes.default
    : null
  const width = options.width || (options.sizes && options.sizes.default)
  const src = buildSrc(uuid, {
    ...options,
    width,
  })
  const srcset = buildSrcSet(uuid, {
    src,
    width,
    pixel_density: options.pixel_density,
    oversize: options.oversize,
    max_resize: options.max_resize,
    format: options.format,
    name: options.name,
  })
  const alt = buildName(null, options.name) || null
  const imageWidth = buildWidth(options.width)

  return cleanKeys({
    sizes,
    src,
    srcset,
    width: imageWidth,
    alt,
  })
}
