import { isNode } from "browser-or-node"

export const GCP = {
  service: (isNode && process.env?.GCP_SERVICE) ?? "",
  version: (isNode && process.env?.GCP_VERSION) ?? ""
}

export const isGcloud = !!(GCP.service && GCP.version)

export const serviceContext = {
  "serviceContext": {
    "service": GCP.service,
    "version": GCP.version
  }
}