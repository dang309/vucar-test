/* eslint-disable prettier/prettier */
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import { Client } from "@elastic/elasticsearch";
import logger from "../config/logger.js";

class ElsClient {
  constructor(esHost, esUser, esPassword, TLSCert) {
    this.connector = null;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    if (esHost && esUser && esPassword && TLSCert) {
      this.connector = new Client({
        node: esHost,
        auth: {
          username: esUser,
          password: esPassword,
        },
        tls: {
          ca: fs.readFileSync(path.resolve(__dirname, TLSCert)),
          rejectUnauthorized: false,
        },
      });
    } else if (process.env.ELASTIC_SEARCH_ENABLE) {
      this.enable = true;
      if (this.enable === true) {
        this.connector = new Client({
          node: `${process.env.ELASTIC_SEARCH_HOST}`,
          auth: {
            username: `${process.env.ELASTIC_SEARCH_USER}`,
            password: `${process.env.ELASTIC_SEARCH_PASSWORD}`,
          },
          tls: {
            ca: fs.readFileSync(path.resolve(__dirname, `${process.env.ELASTIC_SEARCH_CERT}`)),
            rejectUnauthorized: false,
          },
        });
      }
    }
  }

  // init the connection
  async init() {
    return this;
  }

  async createElasticsearchIndex() {
    try {
      const indexExistsResponse = await this.connector.indices.exists({
        index: `${process.env.ELASTIC_SEARCH_INDEX}`,
      });

      if (!indexExistsResponse) {
        const indexSettings = {};
        const indexMappings = {
          properties: {
            id: { type: "keyword" },
            system_id: {
              type: "text",
              fields: {
                keyword: { type: "keyword" },
              },
            },
            model_id: {
              type: "text",
              fields: {
                keyword: { type: "keyword" },
              },
            },
            person_id: {
              type: "text",
              fields: {
                keyword: { type: "keyword" },
              },
            },
            person_name: {
              type: "text",
              fields: {
                keyword: { type: "keyword" },
              },
            },
            asset_id: {
              type: "text",
              fields: {
                keyword: { type: "keyword" },
              },
            },
            path: {
              type: "text",
              fields: {
                keyword: { type: "keyword" },
              },
            },
            pos_x: {
              type: "integer",
              fields: {
                keyword: { type: "keyword" },
              },
            },
            pos_y: {
              type: "integer",
              fields: {
                keyword: { type: "keyword" },
              },
            },
            width: {
              type: "integer",
              fields: {
                keyword: { type: "keyword" },
              },
            },
            height: {
              type: "integer",
              fields: {
                keyword: { type: "keyword" },
              },
            },
            org_width: {
              type: "integer",
              fields: {
                keyword: { type: "keyword" },
              },
            },
            org_height: {
              type: "integer",
              fields: {
                keyword: { type: "keyword" },
              },
            },
            descriptor: {
              type: "dense_vector",
              dims: 512,
              fields: {
                keyword: { type: "keyword" },
              },
            },
            descriptor_length: {
              type: "integer",
              fields: {
                keyword: { type: "keyword" },
              },
            },
            updated_at: {
              type: "text",
              fields: {
                keyword: { type: "keyword" },
              },
            },
            created_at: {
              type: "text",
              fields: {
                keyword: { type: "keyword" },
              },
            },
          },
        };

        const { body: indexResponse } = await this.connector.indices.create({
          index: `${process.env.ELASTIC_SEARCH_INDEX}`,
          body: {
            settings: indexSettings,
            mappings: indexMappings,
          },
        });

        logger.info(
          `Elasticsearch index ${process.env.ELASTIC_SEARCH_INDEX} created successfully.`
        );
      } else {
        logger.info(`Elasticsearch index already exists.`);
      }
    } catch (error) {
      logger.error(`Error creating Elasticsearch index: ${error.message}`);
    }
  }

  async addDocument(
    index,
    docId,
    systemId,
    modelId,
    personId,
    personName,
    assetId,
    path,
    posX,
    posY,
    width,
    height,
    orgWidth,
    orgHeight,
    descriptor,
    descriptorLength,
    updatedAt,
    createdAt
  ) {
    try {
      const payload = {
        system_id: systemId,
        model_id: modelId,
        person_id: personId,
        person_name: personName,
        asset_id: assetId,
        path,
        pos_x: posX,
        pos_y: posY,
        width,
        height,
        org_width: orgWidth,
        org_height: orgHeight,
        descriptor,
        descriptor_length: descriptorLength || 512,
        updated_at: updatedAt || new Date(),
        created_at: createdAt || new Date(),
      };
      const { body } = await this.connector.index({
        index,
        id: docId,
        body: payload,
      });

      logger.info(
        `Document added to Elasticsearch index "${index}" with ID "${docId}"`
      );
    } catch (error) {
      logger.error(`Error adding document to Elasticsearch: ${error.message}`);
    }
  }

  async deleteDocument(index, docId) {
    try {
      const { body } = await this.connector.delete({
        index,
        id: docId,
      });

      logger.info(
        `Deleted from Elasticsearch index "${index}" with ID "${docId}"`
      );
    } catch (error) {
      logger.error(`Error deleting from Elasticsearch: ${error}`);
    }
  }

  async deleteDocumentsByQuery(index, query) {
    try {
      if (!index || !query) {
        throw new Error("Invalid input: index, query must be defined.");
      }

      const { body } = await this.connector.deleteByQuery({
        index: index,
        body: {
          query: query,
        },
      });

      if (body && body.deleted) {
        logger.info(
          `Deleted ${body.deleted} documents from index ${index} by query.`
        );
      } else {
        logger.info(`No documents were deleted.`);
      }
    } catch (error) {
      logger.error(`Error deleting documents by query: ${error.message}`);
    }
  }

}

export default ElsClient;
