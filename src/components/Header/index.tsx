import LogoImg from '../../assets/logo.svg'
import { Container, Content } from './styles'

interface Props {
  onOpenNewTransactionModal: () => void;
}

export function Header({ onOpenNewTransactionModal }: Props) {
  return (
      <Container>
          <Content>
              <img src={LogoImg} alt="dt money"/>
              <button type="button" onClick={onOpenNewTransactionModal}>
                  Nova transação
              </button>
          </Content>
      </Container>
  )
}