const axios = require('axios');
const {
  fetchPlace,
  fetchHistory,
  fetchForecast,
} = require('../controllers/api');

jest.mock('axios');

describe('fetchPlace', () => {
  it('should return place data on successful request', async () => {
    // Mock Axios response for a successful request
    axios.get.mockResolvedValue({
      status: 200,
      data: {
        status: 'OK',
        plus_code: {
          compound_code: 'Some Place Name',
        },
      },
    });

    const req = { query: { lat: 'lat', lon: 'lon' } };
    const res = {
      json: jest.fn(),
    };

    await fetchPlace(req, res);

    expect(res.json).toHaveBeenCalledWith({
      place: 'Some Place Name',
      status: 'success',
    });
  });

  it('should handle error response', async () => {
    // Mock Axios response for an error
    axios.get.mockRejectedValue({});

    const req = { query: { lat: 'lat', lon: 'lon' } };
    const res = {
      json: jest.fn(),
    };

    await fetchPlace(req, res);

    expect(res.json).toHaveBeenCalledWith({
      status: 'Invalid request!',
    });
  });
});

describe('fetchHistory', () => {
  it('should return historical weather data on successful request', async () => {
    // Mock Axios response for a successful request
    axios.get.mockResolvedValue({
      status: 200,
      data: {
        locations: {
          someLocation: {
            values: [
              { datetime: '2023-10-01T00:00:00', maxt: 25, mint: 15 },
              { datetime: '2023-10-02T00:00:00', maxt: 27, mint: 16 },
              // Add more data points as needed for your test
            ],
          },
        },
      },
    });

    const req = { query: { location: 'someLocation' } };
    const res = {
      json: jest.fn(),
    };

    await fetchHistory(req, res);

    // Assert that the response contains the expected data
    expect(res.json).toHaveBeenCalledWith({
      maxTemp: [25, 27], // Add more expected values based on your mock data
      minTemp: [15, 16], // Add more expected values based on your mock data
      days: ['Sunday', 'Monday'], // Add more expected values based on your mock data
    });
  });

  it('should handle error response', async () => {
    // Mock Axios response for an error
    axios.get.mockRejectedValue({});

    const req = { query: { location: 'someLocation' } };
    const res = {
      json: jest.fn(),
    };

    await fetchHistory(req, res);

    // Assert that the response indicates an error
    expect(res.json).toHaveBeenCalledWith({
      status: 'Invalid request!',
    });
  });
});


describe('fetchForecast', () => {
  it('should return weather forecast data on successful request', async () => {
    // Mock Axios response for a successful request
    axios.get.mockResolvedValue({
      status: 200,
      data: {
        locations: {
          someLocation: {
            values: [
              { datetimeStr: '2023-10-03T10:00:00', temp: 25 },
              { datetimeStr: '2023-10-03T11:00:00', temp: 26 },
              { datetimeStr: '2023-10-03T12:00:00', temp: 28 },
              { datetimeStr: '2023-10-03T13:00:00', temp: 29 },
            ],
          },
        },
      },
    });

    const req = { query: { location: 'someLocation' } };
    const res = {
      json: jest.fn(),
    };

    await fetchForecast(req, res);

    // Assert that the response contains the expected data
    expect(res.json).toHaveBeenCalledWith({
      temp: [26,28,29], // Add more expected values based on your mock data
      time: ['11 AM','12 PM','1 PM'], // Add more expected values based on your mock data
    });
  });

  it('should handle error response', async () => {
    // Mock Axios response for an error
    axios.get.mockRejectedValue({});

    const req = { query: { location: 'someLocation' } };
    const res = {
      json: jest.fn(),
    };

    await fetchForecast(req, res);

    // Assert that the response indicates an error
    expect(res.json).toHaveBeenCalledWith({
      status: 'Invalid request!',
    });
  });
});



