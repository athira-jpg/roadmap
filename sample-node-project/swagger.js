const swaggerDefinition = {
  openapi: '3.0.3',

  info: {
    title: 'Patient API',
    version: '1.0.0',
    description: 'REST API for managing patient records.'
  },

  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local development server'
    }
  ],

  tags: [
    {
      name: 'Patients',
      description: 'Patient management endpoints'
    }
  ],

  components: {
    schemas: {
      Patient: {
        type: 'object',
        required: [
          'id',
          'patient_id',
          'patient_name',
          'gender',
          'date_of_birth',
          'visit_date',
          'symptoms',
          'diagnosis',
          'medication',
          'dosage'
        ],
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
            description: 'Internal unique identifier used by the API for GET, PUT and DELETE operations.',
            example: '621c7f80-cefb-47d5-b2b4-01f7c3f25b99'
          },
          patient_id: {
            type: 'string',
            description: 'Human-readable patient identifier.',
            example: 'P1002'
          },
          patient_name: {
            type: 'string',
            description: 'Patient full name.',
            example: 'Jane Smith'
          },
          gender: {
            type: 'string',
            example: 'Female'
          },
          date_of_birth: {
            type: 'string',
            format: 'date',
            example: '1990-09-28'
          },
          visit_date: {
            type: 'string',
            format: 'date',
            example: '2023-01-05'
          },
          symptoms: {
            type: 'string',
            example: 'Cough and Sore Throat'
          },
          diagnosis: {
            type: 'string',
            example: 'Bronchitis'
          },
          medication: {
            type: 'string',
            example: 'Amoxicillin'
          },
          dosage: {
            type: 'string',
            example: '500mg'
          }
        }
      },

      PatientInput: {
        type: 'object',
        required: [
          'patient_id',
          'patient_name',
          'gender',
          'date_of_birth',
          'visit_date',
          'symptoms',
          'diagnosis',
          'medication',
          'dosage'
        ],
        properties: {
          patient_id: {
            type: 'string',
            description: 'Human-readable patient identifier.',
            example: 'P1101'
          },
          patient_name: {
            type: 'string',
            example: 'John Doe'
          },
          gender: {
            type: 'string',
            example: 'Male'
          },
          date_of_birth: {
            type: 'string',
            format: 'date',
            example: '1990-05-15'
          },
          visit_date: {
            type: 'string',
            format: 'date',
            example: '2024-02-01'
          },
          symptoms: {
            type: 'string',
            example: 'Fever and Headache'
          },
          diagnosis: {
            type: 'string',
            example: 'Viral Infection'
          },
          medication: {
            type: 'string',
            example: 'Paracetamol'
          },
          dosage: {
            type: 'string',
            example: '500mg'
          }
        }
      },

      PatientUpdate: {
        type: 'object',
        properties: {
          patient_id: {
            type: 'string',
            example: 'P1002'
          },
          patient_name: {
            type: 'string',
            example: 'Jane Smith Updated'
          },
          gender: {
            type: 'string',
            example: 'Female'
          },
          date_of_birth: {
            type: 'string',
            format: 'date',
            example: '1990-09-28'
          },
          visit_date: {
            type: 'string',
            format: 'date',
            example: '2024-02-10'
          },
          symptoms: {
            type: 'string',
            example: 'Cough'
          },
          diagnosis: {
            type: 'string',
            example: 'Bronchitis'
          },
          medication: {
            type: 'string',
            example: 'Amoxicillin'
          },
          dosage: {
            type: 'string',
            example: '500mg'
          }
        }
      },

      Error: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
            example: 'No patient found with the provided ID.'
          }
        }
      }
    }
  },

  paths: {
    '/api/v1/patients': {
      get: {
        tags: ['Patients'],
        summary: 'Get all patients',
        description: 'Returns all patient records.',
        responses: {
          '200': {
            description: 'Patients retrieved successfully.',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Patient'
                  }
                },
                example: [
                  {
                    id: '621c7f80-cefb-47d5-b2b4-01f7c3f25b99',
                    patient_id: 'P1002',
                    patient_name: 'Jane Smith',
                    gender: 'Female',
                    date_of_birth: '1990-09-28',
                    visit_date: '2023-01-05',
                    symptoms: 'Cough and Sore Throat',
                    diagnosis: 'Bronchitis',
                    medication: 'Amoxicillin',
                    dosage: '500mg'
                  },
                  {
                    id: '4aff6cbc-892b-4dbf-bfa7-ad0f0a346eb1',
                    patient_id: 'P1003',
                    patient_name: 'Michael Johnson',
                    gender: 'Male',
                    date_of_birth: '1978-06-15',
                    visit_date: '2023-01-08',
                    symptoms: 'Headache',
                    diagnosis: 'Migraine',
                    medication: 'Ibuprofen',
                    dosage: '400mg'
                  }
                ]
              }
            }
          },

          '500': {
            description: 'Internal server error.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                },
                example: {
                  error: 'An internal server error occurred.'
                }
              }
            }
          }
        }
      },

      post: {
        tags: ['Patients'],
        summary: 'Create a new patient',
        description: 'Creates a new patient record. The API automatically generates the internal UUID in the id field.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/PatientInput'
              },
              example: {
                patient_id: 'P1101',
                patient_name: 'John Doe',
                gender: 'Male',
                date_of_birth: '1990-05-15',
                visit_date: '2024-02-01',
                symptoms: 'Fever and Headache',
                diagnosis: 'Viral Infection',
                medication: 'Paracetamol',
                dosage: '500mg'
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'Patient created successfully.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Patient'
                },
                example: {
                  id: 'b091f4d0-fe33-40a8-98f5-e8a784f6f120',
                  patient_id: 'P1101',
                  patient_name: 'John Doe',
                  gender: 'Male',
                  date_of_birth: '1990-05-15',
                  visit_date: '2024-02-01',
                  symptoms: 'Fever and Headache',
                  diagnosis: 'Viral Infection',
                  medication: 'Paracetamol',
                  dosage: '500mg'
                }
              }
            }
          },

          '500': {
            description: 'Internal server error.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                },
                example: {
                  error: 'An internal server error occurred.'
                }
              }
            }
          }
        }
      }
    },

    '/api/v1/patients/{id}': {
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'Internal UUID of the patient. This is the value stored in the id field, not patient_id.',
          schema: {
            type: 'string',
            format: 'uuid'
          },
          example: '621c7f80-cefb-47d5-b2b4-01f7c3f25b99'
        }
      ],

      get: {
        tags: ['Patients'],
        summary: 'Get a patient by ID',
        description: 'Returns a single patient using the internal UUID.',
        responses: {
          '200': {
            description: 'Patient retrieved successfully.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Patient'
                },
                example: {
                  id: '621c7f80-cefb-47d5-b2b4-01f7c3f25b99',
                  patient_id: 'P1002',
                  patient_name: 'Jane Smith',
                  gender: 'Female',
                  date_of_birth: '1990-09-28',
                  visit_date: '2023-01-05',
                  symptoms: 'Cough and Sore Throat',
                  diagnosis: 'Bronchitis',
                  medication: 'Amoxicillin',
                  dosage: '500mg'
                }
              }
            }
          },

          '404': {
            description: 'Patient not found.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                },
                example: {
                  error: 'No patient found with the provided ID.'
                }
              }
            }
          },

          '500': {
            description: 'Internal server error.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                },
                example: {
                  error: 'An internal server error occurred.'
                }
              }
            }
          }
        }
      },

      put: {
        tags: ['Patients'],
        summary: 'Update a patient',
        description: 'Updates an existing patient using the internal UUID.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/PatientUpdate'
              },
              example: {
                patient_name: 'Jane Smith Updated',
                symptoms: 'Cough',
                diagnosis: 'Bronchitis',
                medication: 'Amoxicillin',
                dosage: '500mg'
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Patient updated successfully.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Patient'
                },
                example: {
                  id: '621c7f80-cefb-47d5-b2b4-01f7c3f25b99',
                  patient_id: 'P1002',
                  patient_name: 'Jane Smith Updated',
                  gender: 'Female',
                  date_of_birth: '1990-09-28',
                  visit_date: '2023-01-05',
                  symptoms: 'Cough',
                  diagnosis: 'Bronchitis',
                  medication: 'Amoxicillin',
                  dosage: '500mg'
                }
              }
            }
          },

          '404': {
            description: 'Patient not found.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                },
                example: {
                  error: 'No patient found with the provided ID.'
                }
              }
            }
          },

          '500': {
            description: 'Internal server error.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                },
                example: {
                  error: 'An internal server error occurred.'
                }
              }
            }
          }
        }
      },

      delete: {
        tags: ['Patients'],
        summary: 'Delete a patient',
        description: 'Deletes an existing patient using the internal UUID.',
        responses: {
          '204': {
            description: 'Patient deleted successfully. No response body is returned.'
          },

          '404': {
            description: 'Patient not found.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                },
                example: {
                  error: 'No patient found with the provided ID.'
                }
              }
            }
          },

          '500': {
            description: 'Internal server error.',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error'
                },
                example: {
                  error: 'An internal server error occurred.'
                }
              }
            }
          }
        }
      }
    }
  }
};

export default swaggerDefinition;

