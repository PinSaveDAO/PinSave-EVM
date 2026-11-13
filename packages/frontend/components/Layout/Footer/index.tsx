import Link from "next/link";
import {
  createStyles,
  Text,
  Container,
  Group,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
    zIndex: 1,
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    marginTop: 20,
    marginBottom: 10,
    backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.lime[1]
  },

  links: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  text:{
    padding: "8px 12px",
    borderRadius: theme.radius.lg,
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.lg,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors[theme.primaryColor][7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.lime[4],
    },

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

}));

interface NavbarProps {
  links: { link: string; label: string }[];
}

export function Footer({ links }: NavbarProps) {
    const { classes } = useStyles();

    const items = links.map((link) => (
        <Link key={link.label} href={link.link} passHref>
            <Text
                className={classes.link}
            >
                {link.label}
            </Text>
        </Link>
  ));

    return (
    <div className={classes.header}>
        <Container mt={10} className={classes.header}>
            <Text className={classes.text}>Deployed on BOT Chain</Text>
            <Group spacing={5} className={classes.links}>
                {items}
            </Group>
        </Container>
    </div>
    )
}