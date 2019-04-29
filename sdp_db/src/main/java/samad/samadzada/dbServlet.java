package samad.samadzada;

import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import javax.naming.*;
import javax.servlet.http.*;
import javax.sql.*;

public class dbServlet extends HttpServlet{

    public void doGet(HttpServletRequest request, HttpServletResponse response) {
        try {
            Context initContext = new InitialContext();
            Context webContext = (Context)initContext.lookup("java:/comp/env");
            DataSource ds = (DataSource) webContext.lookup("jdbc/postgres");
            PrintWriter out = response.getWriter();

            Connection conn = ds.getConnection();
            String room=request.getParameter("room");
            PreparedStatement pstat = conn.prepareStatement("select text_1 from events where room =? and now() between ava_since and ava_till");
            pstat.setString(1,room);

            ResultSet rs = pstat.executeQuery();

            response.setContentType("text/html");
            if (rs.next()) {
                String b = rs.getString("text_1");
                out.println(b);
            }
            else {
                out.println("");
            }
            rs.close();
            pstat.close();
            conn.close();
        }
        catch (Exception ex) {
            System.out.println("Error"+ex);
        }
    }
}