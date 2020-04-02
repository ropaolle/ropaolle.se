import { useRouter } from 'next/router';
import Link from 'next/link';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { ShieldAltIcon } from './FontAwsomeIcons';
import { StatusIcon } from './StatusIcon';
import { useTranslation } from '../lib/useTranslation';
import { ChangeLanguage } from './ChangeLanguage';

export const Header = ({ user }: { user: any }) => {
  const { pathname } = useRouter();
  const isAuthenticated = !!user;
  const [t] = useTranslation();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="w-100">
      <div>
        <Link href="/" passHref>
          <Navbar.Brand className="d-flex align-items-center">
            <ShieldAltIcon size="36" />
            <div className="pl-2">{t('title')}</div>
          </Navbar.Brand>
        </Link>
        <style jsx>{`
          div :global(.navbar-brand) {
            color: #28a745;
          }
        `}</style>
      </div>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto" activeKey={pathname}>
          <Link href="/" passHref>
            <Nav.Link>{t('header.home')}</Nav.Link>
          </Link>
          {isAuthenticated && (
            <Link href="/history" passHref>
              <Nav.Link>{t('header.history')}</Nav.Link>
            </Link>
          )}
        </Nav>

        <ChangeLanguage />

        <Nav>
          {isAuthenticated ? (
            <Dropdown as={Nav.Item} alignRight>
              {/* NavDropdown can not be used if the dropdown is placed to the right. */}
              <Dropdown.Toggle id="user-dropdown" as={Nav.Link}>
                {user && user.name}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Link href="/me" passHref>
                  <Dropdown.Item>{t('header.me')}</Dropdown.Item>
                </Link>
                <Dropdown.Divider />
                <Link href="/users" passHref>
                  <Dropdown.Item>{t('header.users')}</Dropdown.Item>
                </Link>
                <Link href="/settings" passHref>
                  <Dropdown.Item>{t('header.settings')}</Dropdown.Item>
                </Link>
                <Link href="/admin" passHref>
                  <Dropdown.Item target="_blank">{t('header.admin')}</Dropdown.Item>
                </Link>
                <Dropdown.Divider />
                <Link href="/signout" passHref>
                  <Dropdown.Item>{t('header.signOut')}</Dropdown.Item>
                </Link>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Link href="/signin" passHref>
              <Nav.Link>{t('header.signIn')}</Nav.Link>
            </Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
