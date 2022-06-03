import logoImg from  '../../assets/logo.svg';
import { Container, Content } from './styles';

interface IHeader {
  onNewTransactionModalIsOpen: () => void;
};

const Header: React.FC<IHeader> = ({
  onNewTransactionModalIsOpen,
}) => {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt money" />
        <button type="button" onClick={() => onNewTransactionModalIsOpen()}>Nova transação</button>
      </Content>
    </Container>
  );
}

export { Header };