import api from "./api";

export async function getPaginated(offset = 0, limit = 20) {
  try {
    const res = await api().get(`/pokemon?offset=${offset}&limit=${limit}`);

    return res.data;
  } catch (err) {
    console.log(err.response || "");

    return err.response;
  }
}

export async function getById(id) {
  try {
    const res = await api().get(`/pokemon/${id}`);

    return res.data;
  } catch (err) {
    console.log(err.response || "");

    return err.response;
  }
}
