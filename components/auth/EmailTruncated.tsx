export function EmailTruncated(props:any) {
    const { email } = props;
    const [name, domain] = email.split("@");
    const truncatedName = name.substring(0, 5);
    const truncatedDomain = "••••••com";
  
  
    return (
      <>
      {truncatedName}@{truncatedDomain}
      </>
    );
  }