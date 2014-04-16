package com.fourticq.fanday.server.twitter;


import com.oracle.javafx.jmx.json.JSONWriter;
import twitter4j.*;
import twitter4j.auth.AccessToken;
import twitter4j.json.DataObjectFactory;

import java.util.ArrayList;
import java.util.List;

import static com.fourticq.fanday.server.twitter.TwitterExtractor.Team.*;

/**
 * Retrieve @premierleague Tweets.
 */
public class TwitterExtractor {

    /**
     * Premier League Team.
     */
    public enum Team {
        ARSENAL("ARS"),
        ASTON_VILLA("AVL"),
        CARDIFF_CITY("CAR"),
        CHELSEA("CHE"),
        CRYSTAL_PALACE("CRY"),
        EVERTON("EVE"),
        FULHAM("FUL"),
        HULL_CITY("HUL"),
        LIVERPOOL("LIV"),
        MANCHESTER_CITY("MCI"),
        MANCHESTER_UNITED("MUN"),
        NEWCASTLE_UNITED("NEW"),
        NORWICH_CITY("NOR"),
        SOUTHAMPTON("SOU"),
        STOKE_CITY("STK"),
        SUNDERLAND("SUN"),
        SWANSEA_CITY("SWA"),
        TOTTENHAM_HOTSPUR("TOT"),
        WEST_BROMWICH_ALBION("WBA"),
        WEST_HAM_UNITED("WHU");

        private final String mCode;

        Team(final String pCode) {
            mCode = pCode;
        }

        public final String getCode() {
            return mCode;
        }
    }

    /**
     * Match between Home and Visitor Teams.
     */
    private static final class Match {
        /** Home. */
        private final Team mHomeTeam;

        /** Visitor. */
        private final Team mVisitorTeam;

        public Match(final Team pHomeTeam,
                     final Team pVisitorTeam) {
            mHomeTeam = pHomeTeam;
            mVisitorTeam = pVisitorTeam;
        }

        public final String getHashTag() {
            return "#" + mHomeTeam.getCode() + mVisitorTeam.getCode();
        }
    }

    private final static List<Match> GAMES = new ArrayList<Match>();

    static {
        GAMES.add(new Match(CRYSTAL_PALACE, ASTON_VILLA));
        GAMES.add(new Match(FULHAM, NORWICH_CITY));
        GAMES.add(new Match(SOUTHAMPTON, CARDIFF_CITY));
        GAMES.add(new Match(STOKE_CITY, NEWCASTLE_UNITED));
        GAMES.add(new Match(SUNDERLAND, EVERTON));
        GAMES.add(new Match(WEST_BROMWICH_ALBION, TOTTENHAM_HOTSPUR));
        GAMES.add(new Match(LIVERPOOL, MANCHESTER_CITY));
        GAMES.add(new Match(SWANSEA_CITY, CHELSEA));
        GAMES.add(new Match(ARSENAL, WEST_HAM_UNITED));
    }

    // Twitter account.
    private static final String TWITTER_USER = "premierleague";

    // Obtained via https://dev.twitter.com/apps
    private static final String CONSUMER_KEY = "FUUn3dpJBZtiQk9hOd8U1zvXV";
    private static final String CONSUMER_SECRET = "bKXvqtAPZfhCLg1ltVRr9XU82YTEuNd7MZMezI36htwqKqxCjI";
    private static final String ACCESS_TOKEN = "1937572423-IXlqZCIxhWwoFewJlvFAUfQTxuJGRZ3SsBzh9ZM";
    private static final String ACCESS_TOKEN_SECRET = "ytTSw32OlAWW9QEQ7QYjiOhKfJJNVBY4qK8Rka4xhT3IQ";

    public static void main(final String[] args)
            throws Exception {

        final Twitter twitter = TwitterFactory.getSingleton();

        twitter.setOAuthConsumer(CONSUMER_KEY,
                                 CONSUMER_SECRET);
        twitter.setOAuthAccessToken(new AccessToken(ACCESS_TOKEN,
                                                    ACCESS_TOKEN_SECRET));

        for (final Match match : GAMES) {
            final Query query = new Query("from:" + TWITTER_USER + " " + match.getHashTag());
            final QueryResult result = twitter.search(query);

            System.out.println("\n" + match.getHashTag());
            JSONArray arr = new JSONArray();

            for (final Status status : result.getTweets()) {
                final String tweet = status.getText();
                if (   tweet.startsWith("GOAL")
                    || tweet.startsWith("SUB")
                    || tweet.startsWith("RED CARD")
                    || tweet.startsWith("YELLOW CARD")
                    || tweet.startsWith("FULL-TIME")
                    || tweet.startsWith("HALF-TIME")
                    || tweet.startsWith("KICK-OFF")) {

                    arr.put(new JSONObject().append("text", status.getText())
                                            .append("creation", status.getCreatedAt()));
                }
            }

            System.out.println(arr.toString());
        }
    }
}