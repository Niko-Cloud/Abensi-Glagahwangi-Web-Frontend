import { DataProvider, fetchUtils } from "react-admin";
import { stringify } from "query-string";

const apiUrl = 'http://localhost:3000';
const httpClient = fetchUtils.fetchJson;

export const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      _page: page,
      _limit: perPage,
      _sort: field,
      _order: order,
      ...params.filter 
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    const response = await httpClient(url);
    return ({
      data: response.json,
      total: parseInt((response.headers.get("x-total-count") || "0").split('/').pop() || "0", 10),
    });
  },

  getOne: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => {
      console.log('Resource:', resource);
      console.log('Params:', params);
      console.log('Response JSON:', json);

      
      const data = Array.isArray(json) && json.length > 0 ? json[0] : {};
      if (!data.id) {
        data.id = params.id;
      }

      return {
        data: data,
      };
    }),

  getMany: async (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const { json } = await httpClient(url);
    return ({ data: json });
  },

  getManyReference: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    const { headers, json } = await httpClient(url);
    return ({
      data: json,
      total: parseInt((headers.get('content-range') || "0").split('/').pop() || '0', 10),
    });
  },

  updateMany: async (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    const { json } = await httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    });
    return ({ data: json });
  },

 update: async (resource, params) => {
    try {
      const formData = new FormData();
      Object.keys(params.data).forEach((key) => {   
        if (key === 'image' && params.data[key] && params.data[key].rawFile) {
          formData.append(key, params.data[key].rawFile);
        } else {
          formData.append(key, params.data[key]);
        }
      });

      const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
        method: 'PUT',
        body: formData,
      });

      return { data: json };
    } catch (error) {
      if (error.body && error.body.error) {
        throw new Error(error.body.error);
      }
      throw error;
    }
  },

  create: async (resource, params) => {
    try {
      const formData = new FormData();
      Object.keys(params.data).forEach((key) => {
        if (key === 'image' && params.data[key] && params.data[key].rawFile) {
          formData.append(key, params.data[key].rawFile);
        } else {
          formData.append(key, params.data[key]);
        }
      });

      const { json } = await httpClient(`${apiUrl}/${resource}`, {
        method: 'POST',
        body: formData,
      });

      return { data: json };
    } catch (error) {
      if (error.body && error.body.error) {
        throw new Error(error.body.error);
      }
      throw error;
    }
  },


  delete: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'DELETE',
    }).then(({ json }) => ({ data: json })),

  deleteMany: async (resource, params) => {
    const ids = params.ids.join(',');
    const url = `${apiUrl}/${resource}?id=${ids}`;
    const { json } = await httpClient(url, {
      method: 'DELETE',
      body: JSON.stringify(params.ids),
    });

    if (!Array.isArray(json.data)) {
      throw new Error("The response to 'deleteMany' must be like { data : [...] }, but the received data is not an array.");
    }

    return { data: json.data };
  },
};