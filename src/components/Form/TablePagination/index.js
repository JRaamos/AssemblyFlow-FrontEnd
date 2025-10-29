import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import TablePagination from '@mui/material/TablePagination';
import Button from '@mui/material/Button';
import { Content, PaginationContainer, PaginationQuantity } from './styled';
import { Icon } from 'ui/styled';

const CustomPagination = styled(TablePagination)(({ theme }) => ({
  '& .MuiTablePagination-actions': {
    display: 'flex',
    marginLeft: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  '& .MuiButtonBase-root': {
    margin: theme.spacing(0.5),
    minWidth: 40,
    height: 30,
    backgroundColor: theme.palette.colors.backgroundgrey,
    color: theme.palette.colors.black,

    '&.Mui-selected': {
      color: theme.palette.colors.white,
      backgroundColor: theme.palette.primary.main,
    },
  },
  '& .MuiTablePagination-toolbar': {
    padding: 0,
    '& .MuiTablePagination-spacer': {
    },
    '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows, & .MuiTablePagination-selectRoot': {
      display: 'none',
    },
  },
}));

export default function CustomTablePagination(props) {
  const { count, page, rowsPerPage, onPageChange } = props;
  const [displayedRows, setDisplayedRows] = useState(0);

  useEffect(() => {
    const start = page * rowsPerPage;
    const end = Math.min(count, start + rowsPerPage);
    setDisplayedRows(end - start);
  }, [page, rowsPerPage, count]);

  return (
    <>
      <CustomPagination
        component="div"
        count={count}
        page={page}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[rowsPerPage]}
        ActionsComponent={(subProps) => (
          <>
            <PaginationContainer>
              <PaginationQuantity>
                {`Mostrando ${displayedRows} de ${count} resultados`}
              </PaginationQuantity>
              <Content className={subProps.className}>
                <Button
                  onClick={(event) => subProps.onPageChange(event, subProps.page - 1)}
                  disabled={subProps.page === 0}
                >
                  <Icon icon="arrow-left" nomargin />
                </Button>
                {[...Array(Math.ceil(count / rowsPerPage)).keys()].map((pageNumber) => (
                  <Button
                    key={pageNumber}
                    onClick={(event) => subProps.onPageChange(event, pageNumber)}
                    className={subProps.page === pageNumber ? 'Mui-selected' : ''}
                  >
                    {pageNumber + 1}
                  </Button>
                ))}
                <Button
                  onClick={(event) => subProps.onPageChange(event, subProps.page + 1)}
                  disabled={subProps.page >= Math.ceil(count / rowsPerPage) - 1}
                >
                  <Icon icon="arrow-right" nomargin />
                </Button>
              </Content>
            </PaginationContainer>
          </>
        )}
      />

    </>

  );
}

