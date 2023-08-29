import axios from "axios";
import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Table,
} from "reactstrap";
import { API_URL } from "../../constants";

const Home = () => {
  const [employees, setEmployees] = useState();
  const [modal, showModal] = useState({ add: false, edit: false });
  const [currentEmployee, setCurrentEmployee] = useState();
  const fetchEmployees = () => {
    axios
      .get(`${API_URL}/api/employees`)
      .then((res) => res.data)
      .then((res) => setEmployees(res.employees));
  };
  useEffect(() => {
    fetchEmployees();
  }, []);
  return (
    <Fragment>
      <Table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Age</th>
            <th>Date of birth</th>
            <th>Photo</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {employees && employees.length
            ? employees.map((employee, i) => {
                return (
                  <tr key={i}>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.address ? employee.address : "-"}</td>
                    <td>{employee.age ? employee.age : "-"}</td>
                    <td>
                      {moment(employee.dob).isValid()
                        ? moment(employee.dob).format("DD MMM YYYY")
                        : "-"}
                    </td>
                    <td>
                      {employee.photo ? (
                        <img
                          src={`${API_URL}/${employee.photo}`}
                          alt=""
                          width={20}
                          height={20}
                          crossOrigin="anonymous"
                        />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td>
                      <AiFillEdit
                        role="button"
                        onClick={() => {
                          setCurrentEmployee(employee);
                          fetchEmployees();
                          showModal({ ...modal, edit: !modal.edit });
                        }}
                      />
                    </td>
                    <td>
                      <AiFillDelete
                        role="button"
                        onClick={async () => {
                          await axios.delete(
                            `${API_URL}/api/employees/${employee._id}`
                          );
                          fetchEmployees();
                        }}
                      />
                    </td>
                  </tr>
                );
              })
            : null}
          {currentEmployee ? (
            <Modal
              isOpen={modal.edit}
              toggle={() => {
                showModal({ ...modal, edit: !modal.edit });
              }}
            >
              <ModalHeader
                toggle={() => {
                  showModal({ ...modal, edit: !modal.edit });
                }}
              >
                Add Employee
              </ModalHeader>
              <ModalBody>
                <Form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const dob = formData.get("dob");
                    const age = dob
                      ? moment().diff(moment(dob), "years")
                      : null;
                    if (age) {
                      formData.append("age", age);
                    }
                    const response = await axios.put(
                      `${API_URL}/api/employees/${currentEmployee._id}`,
                      formData,
                      {
                        headers: {
                          "Content-Type": "multipart/form-data",
                        },
                      }
                    );
                    if (response.status === 200) {
                      fetchEmployees();
                      showModal({ ...modal, edit: !modal.edit });
                    }
                  }}
                >
                  <FormGroup>
                    <Label>Name:</Label>
                    <Input
                      type="text"
                      name="name"
                      defaultValue={currentEmployee.name}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Email:</Label>
                    <Input
                      type="email"
                      name="email"
                      defaultValue={currentEmployee.email}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>DOB:</Label>
                    <Input
                      type="date"
                      name="dob"
                      defaultValue={moment(currentEmployee.dob).format(
                        "YYYY-MM-DD"
                      )}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Address:</Label>
                    <Input
                      type="textarea"
                      name="address"
                      defaultValue={currentEmployee.address}
                    />
                  </FormGroup>
                  {/* <FormGroup>
                    <Label>Photo:</Label>
                    <Input
                      type="file"
                      name="photo"
                      value={currentEmployee.photo}
                    />
                  </FormGroup> */}
                  <div className="d-flex flex-row gap-3">
                    <Button color="primary" type="submit">
                      Edit Employee
                    </Button>
                    <Button
                      color="secondary"
                      type="button"
                      onClick={() => {
                        showModal({ ...modal, edit: !modal.edit });
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              </ModalBody>
            </Modal>
          ) : null}
        </tbody>
      </Table>
      <Button
        className="mx-auto d-block"
        color="primary"
        onClick={() => {
          showModal({ ...modal, add: !modal.add });
        }}
      >
        Add Employee
      </Button>
      <Modal
        isOpen={modal.add}
        toggle={() => {
          showModal({ ...modal, add: !modal.add });
        }}
      >
        <ModalHeader
          toggle={() => {
            showModal({ ...modal, add: !modal.add });
          }}
        >
          Add Employee
        </ModalHeader>
        <ModalBody>
          <Form
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const dob = formData.get("dob");
              const age = dob ? moment().diff(moment(dob), "years") : null;
              if (age) {
                formData.append("age", age);
              }
              const response = await axios.post(
                `${API_URL}/api/employees`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
              );
              if (response.status === 200) {
                showModal({ ...modal, add: !modal.add });
              }
            }}
          >
            <FormGroup>
              <Label>Name:</Label>
              <Input type="text" name="name" />
            </FormGroup>
            <FormGroup>
              <Label>Email:</Label>
              <Input type="email" name="email" />
            </FormGroup>
            <FormGroup>
              <Label>DOB:</Label>
              <Input type="date" name="dob" />
            </FormGroup>
            <FormGroup>
              <Label>Address:</Label>
              <Input type="textarea" name="address" />
            </FormGroup>
            <FormGroup>
              <Label>Photo:</Label>
              <Input type="file" name="photo" />
            </FormGroup>
            <div className="d-flex flex-row gap-3">
              <Button color="primary" type="submit">
                Add Employee
              </Button>
              <Button color="danger" type="reset">
                Reset
              </Button>
              <Button
                color="secondary"
                type="button"
                onClick={() => {
                  showModal({ ...modal, edit: !modal.edit });
                }}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default Home;
