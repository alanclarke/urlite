declare module "urlite" {
  export type URLDescriptor = {
    protocol?: string
    auth?: string
    hostname?: string
    port?: string
    path?: string
    pathname?: string
    search?: string
    hash?: string
    href?: string
  }
  export function parse(path: string): URLDescriptor
  export function format(obj: URLDescriptor): string
}

declare module "urlite/extra" {
  export type URLDescriptorExtra = {
    protocol?: string
    auth?: { user?: string; password?: string }
    hostname?: string
    port?: string
    path?: string
    pathname?: string
    search: Record<string, string | string[] | true | undefined>
    hash: Record<string, string | string[] | true | undefined>
    href?: string
  }

  export function parse(path: string): URLDescriptorExtra
  export function format(obj: URLDescriptorExtra): string
}
