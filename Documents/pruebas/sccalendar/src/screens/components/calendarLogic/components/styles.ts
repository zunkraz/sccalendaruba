interface Style {
  [key: string]: string | number;
}

export const col: Style = {
  border: '#e0e0e0 1px solid',
};

export const weekDays: Style = {
  height: 100,
};

export const weekDayName: Style = {
  fontSize: 12,
  lineHeight: '32px',
  textTransform: 'capitalize',
  color: '#757575',
  marginLeft: 10,
};

export const container: Style = {
  paddingRight: '1em',
  paddingTop: '2em',
  paddingBottom: '2em',
};

export const weekDates: Style = {
  fontSize: 40,
  lineHeight: '12px',
  color: '#9e9e9e',
  marginLeft: 10,
    marginTop: 20,
};

export const slot: Style = {
  height: 40,
  cursor: 'pointer',
};

export const timeCol: Style = {
  fontSize: 10,
  color: '#274372',
  textAlign: 'right',
  padding: 6,
};

export const timeString: Style = {
  position: 'absolute',
  right: 8,
  top: -8,
};

export const row: Style = {
  position: 'relative',
};

export const toolbar: Style = {
  paddingBottom: 10,
};

export const toolbarDate: Style = {
  fontSize: 20,
  fontWeight: 400,
  opacity: 0.54,
  lineHeight: '30px',
  textAlign: 'right',
};

export const appTitle: Style = {
  fontSize: 20,
  fontWeight: 400,
  lineHeight: '30px',
};

export const alignRight: Style = {
  textAlign: 'right',
};

export const spacify: Style = {
  marginRight: 5,
};

export const inputStyles: Style = {
  marginTop: 25,
  marginBottom: 15,
};

export const weekButtons: Style = {
  paddingRight: 0,
  paddingLeft: 14,
  textAlign: 'center',
};

export const lightHighlighter: Style = {
  backgroundColor: 'rgba(0,0,0,0.04)',
};

export const eventHighlighter: Style = {
  position: 'absolute',
  backgroundColor: 'rgba(39, 67, 114, 0.8)',
  borderRadius: '4px',
  color: 'white',
  padding: '2px 4px',
  fontSize: '12px',
  zIndex: 1,
  cursor: 'pointer',
};
