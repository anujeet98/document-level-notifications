import { Col, Container, Row } from "react-bootstrap";
import { TeamCard } from "./TeamCard";

const colors = ['#ffcccc','#ccffcc' ,'#ccccff' ,'#ffcc99','#99ccff','#ff99cc','#ffff99','#cc99ff','#99ff99','#ff9966'];



const TeamPanel = (props) => {
    let i= 0;

    let teamData = [];
    teamData = props.teamData.map(team => {
        return {...team, color: colors[i++]}
    })
    return (
      <Container fluid>
        <Row className="flex-nowrap" style={{ overflowX: 'auto' }}>
          {teamData.map((team, index) => (
            <Col key={index} xs="auto">
              <TeamCard team={team} />
            </Col>
          ))}
        </Row>
      </Container>
    );
  };
  
  export default TeamPanel;